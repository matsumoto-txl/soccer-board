// 戦術ボード Service Worker
// ★更新はサイレントに当てない。新しい版は待機させ、画面の「更新する」で SKIP_WAITING を受けてから切り替える。
const CACHE='soccer-board-0.9.1';
const FILES=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
});
self.addEventListener('message',e=>{
  if(e.data==='SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('soccer-board-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
