BlockEvents.broken("kubejs:dynamo", (event) => {
  if (
    !event.player.isCreative() &&
    event.block.properties.get("active").toLowerCase() === "true"
  )
    event.block.popItem("kubejs:star");
});
