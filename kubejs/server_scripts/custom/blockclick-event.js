global.jei.recipes.click.forEach((e) => {
  const { main_hand, off_hand, block } = e.input;
  const { block_replace, drop, chance, isCrouching } = e.output;
  BlockEvents.rightClicked(block, (event) => {
    const { x, y, z } = event.block;

    let flag_isCrouching = true;
    if (main_hand == "") {
      main_hand = "minecraft:air";
    }
    if (off_hand == "") {
      off_hand = "minecraft:air";
    }

    if (isCrouching) {
      flag_isCrouching = event.player.isCrouching();
    }

    if (
      event.player.mainHandItem == main_hand &&
      event.player.offHandItem == off_hand &&
      flag_isCrouching
    ) {
      if (rnd50()) {
        event.player.swing();
        event.server.runCommandSilent(
          "/particle block " +
            block +
            " " +
            x +
            " " +
            y +
            " " +
            z +
            " 0.75 0.75 0.75 0.3 " +
            rnd(10, 30)
        );
        //need sound here
        drop.forEach((element, index) => {
          if (rndC(chance[index])) {
            event.block.popItemFromFace(element, event.facing);
          }
        });
        if (rnd25()) {
          if (event.block.properties.get("facing") != undefined)
            event.block.set(block_replace, { facing: event.facing });
          else event.block.set(block_replace);
        }
      } else {
        event.cancel();
      }
    }
  });
});
