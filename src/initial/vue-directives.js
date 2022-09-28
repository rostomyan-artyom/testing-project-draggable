import Vue from 'vue';

//  События мыши по event-outside
Vue.directive('click-outside', {
 bind: function (el, binding, vnode) {
   //исключения - по скольку datepicker у нас в body - его отловить не получится, впишем в исключение.
   const exceptions = ['mx-datepicker-main'];

   el.clickOutsideEvent = function (event) {
     if (!(el == event.target || el.contains(event.target))) {
       let exceptionFound = false;

       exceptions.forEach(exceptionItem => {
         if(exceptionFound) return;

         const result = event.path.find(pathItem => {
           if(pathItem.classList?.length) {
             return [...pathItem.classList].includes(exceptionItem);
           }
         });

         result ? exceptionFound = true : '';
       });

       if(!exceptionFound) vnode.context[binding.expression](event);

     }
   }
   document.body.addEventListener('click', el.clickOutsideEvent);
 },

 unbind: function (el) {
   document.body.removeEventListener('click', el.clickOutsideEvent);
 }
})
