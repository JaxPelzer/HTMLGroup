"use strict";



window.addEventListener("load", function () {
   var Data = location.search.slice(1);
   Data = Data.replace(/\+/g, " ");
   Data = decodeURIComponent(Data);
   var orderFields = Data.split(/[&=}]/g);

   document.forms.cart.elements.modelName.value = orderFields[0];

   calcCart();
   var cart = document.forms.cart;
   cart.elements.modelQty.onchange = calcCart;

   var shippingOptions = document.querySelectorAll('input[name="shipping"]');
   for (var i = 0; i <= shippingOptions.length; i++) {
      shippingOptions[i].onclick = calcCart;
   }

});


function calcCart() {
   var cart = document.forms.cart;
   var machineCost = cart.elements.modelCost.value;
   var qIndex = cart.elements.modelQty.selectedIndex;
   var qty = cart.elements.modelQty[qIndex].value;

   var orderCost = machineCost * qty;
   cart.elements.orderCost.value = formatUSCurrency(orderCost);

   var shipCost = document.querySelector('input[name="shipping"]:checked').value * qty;
   cart.elements.shippingCost.value = formatNumber(shipCost);

   cart.elements.subTotal.value = formatNumber(orderCost + shipCost, 2);


   var salesTax = 0.05 * (orderCost + shipCost);
   cart.elements.salesTax.value = formatNumber(salesTax, 2);

   cart.elements.cartTotal.value = formatUSCurrency(orderCost + shipCost + salesTax);

}


function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
   });
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', { style: "currency", currency: "USD" });
}
