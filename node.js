const commandLineArgs = require('minimist')
const crypto = require("crypto");
const http = require('http'); // Import Node.js core module
require('dotenv').config();

const argv = commandLineArgs(process.argv.slice(2));
const PORT = argv["port"] || 5000;

const expIn = (str) => {
  let result = parseInt(str);
  return isNaN(result) ? 3600 : result;
}
const toBase64URL = (json) => {
  const jsonString = JSON.stringify(json);
  const btyeArray = Buffer.from(jsonString);
  return btyeArray.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

const generateJWT = (expired_in, scopes, credentinal) => {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expIn(expired_in);
  const payload = {
    iss: credentinal.client_email,
    scope: scopes,
    aud: credentinal.token_uri,
    exp,
    iat,
  };
  const encodedHeader = toBase64URL(header);
  const encodedClaimSet = toBase64URL(payload);
  const signer = crypto.createSign("RSA-SHA256");
  signer.write(encodedHeader + "." + encodedClaimSet);
  signer.end();
  const signature = signer.sign(credentinal.private_key, "base64");
  const encodedSignature = signature.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return {
    token: `${encodedHeader}.${encodedClaimSet}.${encodedSignature}`,
    expires_in: exp,
  };
}

const server = http.createServer(function (req, res) {
  const url = new URL(`http://localhost:${PORT}${req.url}`);
  if (url.pathname == '/generate/access-token') {
    try {
      const credentinal = JSON.parse(process.env.GOOGLE_SERVICE_ADDRESS);
      const jwt = generateJWT(url.searchParams.get('expired_in'), url.searchParams.get('scopes'), credentinal);

      const urlGoogle = new URL(credentinal.token_uri);
      urlGoogle.searchParams.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
      urlGoogle.searchParams.append('assertion', jwt.token);

      fetch(urlGoogle, {
        method: "POST",
      })
        .then(resp => resp.json())
        .then(data => {
          // set response header
          res.writeHead(200, { 'Content-Type': 'application/json' });
          // set response content    
          res.write(JSON.stringify({ ...data, expires_in: jwt.expires_in }));
          res.end();
        });
    } catch (e) {
      // set response header
      res.writeHead(500, { 'Content-Type': 'application/json' });
      // set response content    
      res.write(JSON.stringify({
        error: e.message
      }));
      res.end();
    }
  } else if (url.pathname == '/generate/jwt') {
    try {
      const credentinal = JSON.parse(process.env.GOOGLE_SERVICE_ADDRESS);
      const jwt = generateJWT(url.searchParams.get('expired_in'), url.searchParams.get('scopes'), credentinal);
      // set response header
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // set response content    
      res.write(JSON.stringify({ jwt }));
      res.end();
    } catch (e) {
      // set response header
      res.writeHead(500, { 'Content-Type': 'application/json' });
      // set response content    
      res.write(JSON.stringify({
        error: e.message
      }));
      res.end();
    }
  }
});

server.listen(PORT); //6 - listen for any incoming requests

console.log(`Node.js web server at port ${PORT} is running..`)