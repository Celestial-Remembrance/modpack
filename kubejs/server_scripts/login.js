PlayerEvents.loggedIn(event=>{
    if (!event.player.stages.has('welcome')) {
      event.player.stages.add('welcome')

        event.player.give('minecraft:iron_pickaxe')
        event.player.give('3x minecraft:apple')
        event.player.tell("Welcome to the MOON")
        event.player.setHeadArmorItem('ad_astra:space_helmet')
        event.player.setChestArmorItem(Item.of('ad_astra:space_suit', '{BotariumData:{StoredFluids:[{Amount:10000L,Fluid:"ad_astra:oxygen"}]}}'))
        event.player.setLegsArmorItem('ad_astra:space_pants')
        event.player.setFeetArmorItem('ad_astra:space_boots')


    }
    
    
})

ItemEvents.rightClicked('minecraft:stick',event=>{
  let list = [
    Fluid.of('minecraft:lava',10),
    Item.of("minecraft:stone",10)
  ]

list.forEach(e=>{
  event.player.tell(e+' -> ' +e == Item.of())
})
  
})
