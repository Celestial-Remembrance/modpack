ServerEvents.recipes(event=>{
    global.resources.crystals.forEach(e => {
        event.recipes.kubejs.shapeless('kubejs:'+e.id+'_crystal_block','4x '+element.id+'_shard')
    });
    
})