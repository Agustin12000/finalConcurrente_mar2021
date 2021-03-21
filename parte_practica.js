const quantityRefrigerators = Array(7).fill(null);

const deposit = []

let refrigerators = []

let vendors = [
  "Quilmes",
  "Brahma",
  "Andes",
  "Miller",
  "Stella Artois"
]

const self = {name: "agustin", occupied: false};

const friends = [
  "Juan",
  "Patricio",
  "Mario",
]

const busyFriends = [

]

const capacity = {
  bottles: 10,
  cans: 15
}

const removeItemFromArr = ( arr, item ) => {
  const i = arr.indexOf( item );

  if ( i !== -1 ) {
    arr.splice( i, 1 );
  }
}

const createRefrigerators = () => quantityRefrigerators.map(
  (e, index) => (
    {name: `refrigerator${index + 1}`, content:{bottles:0,cans:0}}
  )
)

const generateRefrigerators = () => {
  refrigerators = createRefrigerators()
}

const vendorsBringBeer = () => {
  const vendorIndex = Math.floor(Math.random() * vendors.length)
  const vendor = vendors.splice( vendorIndex, 1 ).pop();

  return {
    vendor: vendor,
    bottles: Math.floor(Math.random() * 50),
    cans: Math.floor(Math.random() * 50)
  }
}

const serveRefrigerators = async (peopleWithBeer) => {
  if(peopleWithBeer && peopleWithBeer.self){
    refrigerators = await refrigerators.map(refrigerator => {
      if(refrigerator.content.bottles === capacity.bottles && refrigerator.content.cans === capacity.bottles){
        return refrigerator
      } else {
        const bottlesToAdd =  capacity.bottles - refrigerator.content.bottles;
        const cansToAdd = capacity.cans - refrigerator.content.cans;
        console.log(bottlesToAdd, cansToAdd)
        return refrigerator
      }
    })
    console.log(refrigerators)
    self.occupied = false;
  } else {
    refrigerators = await refrigerators.map(refrigerator => {
      if(refrigerator.content.bottles === capacity.bottles && refrigerator.content.cans === capacity.bottles){
        return refrigerator
      } else {
        const bottlesToAdd =  capacity.bottles - refrigerator.content.bottles;
        const cansToAdd = capacity.cans - refrigerator.content.cans;
        console.log(bottlesToAdd, cansToAdd)
        return refrigerator
      }
    })
    console.log(refrigerators)
    friends.push(peopleWithBeer.name)
  }
}

const serveSuppliers = (vendor) => {
  const notAvailableFriends = !friends.length;
  const notAvailableSelf = !self.occupied;
  if(notAvailableFriends && notAvailableSelf) {
    return "wait"
  } else if (notAvailableSelf) {
    const friendIndex = Math.floor(Math.random() * vendors.length)
    const friend = friends.splice( friendIndex, 1 ).pop();
    const friendWithBeers = {
      name: friend,
      bottle: vendor.bottles,
      cans: vendor.cans
    } 
    serveRefrigerators(friendWithBeers)
    return ""
  } else if (notAvailableFriends) {
    self.occupied = true
    const selfWithBeers = {
      name: self.name,
      bottle: vendor.bottles,
      cans: vendor.cans,
      self: true
    } 
    serveRefrigerators(selfWithBeers)
    return ""
  }
}

const loadBeers = async (callback) => {
  const quantityVendors = await Math.floor(Math.random() * vendors.length)
  const iterableVendors = await Array(quantityVendors).fill(null);
  const readyVendor = await iterableVendors.map((e)=> vendorsBringBeer());
  
  serveSuppliers(readyVendor);

  if(!vendors.length) {
    return null;
  }
}

generateRefrigerators()
loadBeers(loadBeers)

