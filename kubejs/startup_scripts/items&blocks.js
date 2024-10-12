// priority: -1
let types = [
  {
    id: "kubejs:copper",
    color: 0xffb451,
  },
  {
    id: "kubejs:iron",
    color: 0xdbdbdb,
  },
  {
    id: "kubejs:tin",
    color: 0xa9e6dc,
  },
  {
    id: "kubejs:redstone",
    color: 0xf73737,
  },
  {
    id: "kubejs:coal",
    color: 0x616161,
  },
  {
    id: "kubejs:nickel",
    color: 0xf0dd8e,
  },
];

let Cblock = '_crystal_block'
let Cshard = '_shard'

StartupEvents.registry("item", (event) => {
  event.create("kubejs:star").texture("kubejs:item/star");
  event.create("kubejs:star2").texture("kubejs:item/star-2");

  potion(event, "kubejs:limewater", 0xffffaf);

  types.forEach((e, index) => {
    shard(event, e.id, e.color, true);
  });
});

StartupEvents.registry("block", (event) => {
  types.forEach((e, index) => {
    crystal_block(event, e.id, e.color);
  });

  global.resources.meteorites.forEach((element) => {
    event
      .create(element.block)
      .defaultCutout()
      .soundType(SoundType.ANCIENT_DEBRIS)
      .box(1, 0, 1, 14, 3, 14)
      .noDrops()
      .item((item) => {
        item.modelJson({
          parent: "kubejs:block/sample/"+ element.icon,
        });
      }).blockstateJson = meteors(element.type);
  });
});