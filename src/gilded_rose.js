/*sell_in numero dias para vender el item
quality valor del item


Normal
Al final del dia ambos factores (sell_in y quality) reducen el valor de los items
Cuando sell_in < 0 la calidad se degrada el doble de rápido

Aged Brie incrementa la calidad según envejece
Sulfuras no se puede vender y no decrece en calidad (quality)
Backstage passes incrementa en calidad  y decrece el sell_in
    Calidad * 2  cuando 10 dias o menos en sell_in
    Calidad * 3  cuando 5 dias o menos en sell_in
    Calidad = 0 cuando sell_in == 0

El valor de la calidad nunca es negativo

Conjuros degragadan en calidad el doble de rapido
*/

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

var types = {
'normal':'Normal Item',
'backStage':'Backstage passes to a TAFKAL80ETC concert', 
'agedBrie':'Aged Brie', 
'sulfuras':'Sulfuras, Hand of Ragnaros',
'conjured':'Conjured Mana Cake'
};

function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
    var currentItem = items[i];
    var currentItemType = getItemType(currentItem.name);
    switch(currentItemType){
        case 'Backstage passes to a TAFKAL80ETC concert':
          if (currentItem.sell_in==0){
            currentItem.quality = 0;
          }
          else if(currentItem.sell_in<=10&&currentItem.sell_in>=5){
            currentItem.quality = currentItem.quality * 2; 
          }
          else if(currentItem.sell_in<5&&currentItem.sell_in>0){
            currentItem.quality = currentItem.quality * 3;
          }
          break;
        case 'Aged Brie':
            currentItem.quality+=1;
          break;
        case 'Sulfuras, Hand of Ragnaros':
          break;
        case 'Normal Item':
          rate = currentItem.sell_in < 0 ? 2 : 1;
          currentItem.quality-=rate;
          currentItem.sell_in-=1;
          break;
    }
    currentItem.quality = currentItem.quality > 50 ? 50 : currentItem.quality;
    currentItem.quality = currentItem.quality < 0 ? 0 : currentItem.quality;
  }

  /*for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }*/
}

function getItemType(itemName){
  var type = types.normal;
  if (itemName==types.backStage){
    type = types.backStage;
  }
  else if(itemName==types.agedBrie){
    type = types.agedBrie;
  }
  else if(itemName==type.sulfuras){
    type = types.sulfuras;
  }

  return type;
}

