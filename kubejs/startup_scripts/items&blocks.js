// priority: -1
StartupEvents.registry("item", (event) => {
  event.create("kubejs:star").texture("kubejs:item/star");

  potion(event, "kubejs:limewater", 0xffffaf);

  let types = [
    {
      id: "kubejs:tritium",
      color: 0x8df2d4,
    },
    {
      id: "kubejs:tritanium",
      color: 0xcd57f0,
    },
  ];

  types.forEach((e, index) => {
    ingot(event, e.color, e.id);
    dust(event, e.color, e.id);
    dirty_dust(event, e.color, e.id, true);
    nugget(event, e.color, e.id, true);
    clump(event, e.color, e.id);
    shard(event, e.color, e.id);
  });
});
