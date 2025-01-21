// priority: 1
global.jei = {
  recipes: {
    blockdrop:[]
  },
};
global.resources = {
  meteorites: [
    // {
    //   block: "mercury_meteorite",
    //   drop: ["kubejs:copper_shard","kubejs:iron_shard", "kubejs:tin_shard"],
    //   multiplier: [20,14, 12],
    //   biomes: ["ad_astra:lunar_wastelands"],
    //   type: "mercury",
    // },
    // {
    //   block: "mars_meteorite",
    //   drop: [
    //     "kubejs:redstone_shard",
    //     "kubejs:nickel_shard",
    //     "kubejs:coal_shard"
    //   ],
    //   multiplier: [24, 10,5],
    //   biomes: ["ad_astra:martian_wastelands"],
    //   type: "mars",
    // },
    // {
    //   block: "generic_meteorite",
    //   drop: ["minecraft:stone"],
    //   multiplier: [10],
    //   biomes: ["ad_astra:venus_wastelands"],
    //   type: "all",
    // },
  ],
  crystals:[
    {
      id: "copper",
      color: 0xffb451,
    },
    {
      id: "iron",
      color: 0xdbdbdb,
    },
    {
      id: "tin",
      color: 0xa9e6dc,
    },
    {
      id: "nickel",
      color: 0xf0dd8e,
    },
    {
      id: "desh",
      color: 0xf0dd8e,
    },
    {
      id: "gold",
      color: 0xf0dd8e,
    },
    {
      id: "aluminum",
      color: 0xf0dd8e,
    },
    {
      id: "ostrum",
      color: 0xf0dd8e,
    },
    {
      id: "calorite",
      color: 0xf0dd8e,
    }
  ]
};

// let list_gems = ['redstone','emerald','diamond','coal','quartz']
// global.resources.gems = []
// global.resources.crystals.forEach(e=>{
// if(list_gems.indexOf(e.id) != -1){
//   global.resources.gems.push(e)
// }
// })


// global.resources.meteorites.forEach(element => {
//   let sum = 0
//   element.multiplier.forEach(m=>{
//     sum += m
//   })
//   let list = []
//   element.multiplier.forEach(m=>{
//     list.push(Math.floor((m/sum)*100)+'%')
//   })
//   element.multiplier = list

//   global.jei.recipes.blockdrop.push({
//     input: 'kubejs:'+element.block,
//     output: {
//       id: element.drop,
//       count: element.multiplier,
//     },
//   })
// });


global.be = {
  energy_links : [
    "ad_astra:steel_cable",
    "ad_astra:desh_cable",
    "mekanism:creative_energy_cube",
    "mekanism:basic_universal_cable",
    "mekanism:advanced_universal_cable",
    "mekanism:elite_universal_cable",
    "mekanism:ultimate_universal_cable",
    "mekanism:basic_energy_cube",
    "mekanism:advanced_energy_cube",
    "mekanism:elite_energy_cube",
    "mekanism:ultimate_energy_cube",
  ]
}