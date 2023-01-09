export default function auth({ next, router , msg}) {
    if (msg){
      return router.push({name: 'home'})
    }
  
    return next();
  }