// // Respond to OPTIONS method
// export async function onRequestOptions() {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': '*',
//       'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
//       'Access-Control-Max-Age': '86400',
//     },
//   });
// };

// // Set CORS to all /api responses
// export async function onRequest({ next }) {
//   const response = await next();
//   response.headers.set('Access-Control-Allow-Origin', '*');
//   response.headers.set('Access-Control-Max-Age', '86400');
//   return response;
// };