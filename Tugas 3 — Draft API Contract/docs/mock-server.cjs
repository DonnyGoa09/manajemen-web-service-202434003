// Mock contract Minggu 3; fixture, bukan data harga live.
const http = require('node:http');
const games = [{id:1,title:'Game Contoh',platform:'pc',is_free:true,source:'fixture',updated_at:'2026-09-30T00:00:00Z'}];
http.createServer((req,res)=>{
  const url = new URL(req.url,'http://localhost');
  const send=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(body,null,2));};
  if(req.method!=='GET') return send(405,{message:'Method not allowed',errors:null});
  if(url.pathname==='/api/games'){
    const invalid=[...url.searchParams.keys()].some(k=>k!=='platform') || (url.searchParams.has('platform')&&!['pc','browser'].includes(url.searchParams.get('platform')));
    if(invalid)return send(422,{message:'The given data was invalid.',errors:{platform:['Gunakan platform pc atau browser; hanya parameter platform yang didukung.']}});
    return send(200,{data:games.filter(g=>!url.searchParams.has('platform')||g.platform===url.searchParams.get('platform'))});
  }
  if(url.pathname==='/api/games/1')return send(200,{data:games[0]});
  return send(404,{message:'Resource not found',errors:null});
}).listen(3003,'127.0.0.1',()=>console.log('Mock GameHunter: http://127.0.0.1:3003'));
