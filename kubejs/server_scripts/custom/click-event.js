BlockEvents.broken('kubejs:dynamo',event=>{
    if(event.block.properties.get('active').toLowerCase()==='true') event.block.popItem('kubejs:star')
})