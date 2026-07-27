self.addEventListener('install', e => { e.waitUntil(caches.open('v1')) })
