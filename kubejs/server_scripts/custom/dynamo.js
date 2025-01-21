BlockEvents.broken("kubejs:dynamo", (event) => {
  if (
    // !event.player.isCreative() &&
    event.block.properties.get("active").toLowerCase() === "true"
  ) {
    event.block.popItem("kubejs:star");

    event.level.playSound(
      null,
      event.block.x,
      event.block.y,
      event.block.z,
      "thoriumreactors:reactor.shutdown",
      "blocks",
      1,
      1
    );
  }
});
