//priority : -1
JEIAddedEvents.registerCategories((event) => {
  //---------------------------------------------------------------------------------------//
  //                                       CLICK EVENT                                     //
  //---------------------------------------------------------------------------------------//
  event.custom("kubejs:click-event", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Click on Block")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/click_event.png",
          2,
          2,
          136,
          128
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("kubejs:icon_click")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.input?.main_hand !== undefined &&
          recipe?.data?.input?.off_hand !== undefined &&
          recipe?.data?.input?.block !== undefined &&
          recipe?.data?.input?.extra !== undefined &&
          recipe?.data?.output?.block_replace !== undefined &&
          recipe?.data?.output?.drop !== undefined &&
          recipe?.data?.output?.chance !== undefined &&
          recipe?.data?.output?.isCrouching !== undefined &&
          recipe?.data?.output?.extra !== undefined &&
          recipe?.data?.output?.type !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.input.main_hand, "INPUT", 35, 16, builder);
        verify(recipe.data.input.off_hand, "INPUT", 2, 51, builder);
        verifyCrude(
          recipe.data.input.extra != ""
            ? Item.of(
                recipe.data.input.block,
                `{display:{Lore:['{\"text\":\"` +
                  recipe.data.input.extra +
                  `\"}']}}`
              )
            : Item.of(recipe.data.input.block),

          "INPUT",
          35,
          82,
          builder
        );
        verifyMixed(
          recipe.data.output.type,
          recipe.data.output.extra != ""
            ? Item.of(
                recipe.data.output.block_replace,
                `{display:{Lore:['{\"text\":\"` +
                  recipe.data.output.extra +
                  `\"}']}}`
              )
            : recipe.data.output.block_replace,
          "OUTPUT",
          88,
          22,
          builder
        );

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            verify(
              recipe.data.output.drop[j * 3 + i],
              "OUTPUT",
              67 + i * 21,
              61 + j * 21,
              builder
            );
          }
        }
      })
      //---------------------------------------------------------------------//
      //                            TEXT DRAWING                             //
      //---------------------------------------------------------------------//
      .setDrawHandler(
        (recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              if (
                recipe.data.output.chance[j * 3 + i] === undefined &&
                recipe.data.output.drop[j * 3 + i] !== undefined
              ) {
                guiGraphics.drawWordWrap(
                  Client.font,
                  Text.of(convertString("100%")),
                  68 + i * 21,
                  72 + j * 21,
                  20,
                  20
                );
              }
              if (recipe.data.output.drop[j * 3 + i] !== undefined) {
                guiGraphics.drawWordWrap(
                  Client.font,
                  Text.of(
                    convertString(recipe.data.output.chance[j * 3 + i] + "%")
                  ),
                  68 + i * 21,
                  72 + j * 21,
                  20,
                  20
                );
              }
            }
          }

          guiGraphics.drawWordWrap(
            Client.font,
            Text.of(convertString("right")).bold(),
            31,
            4,
            100,
            0
          );
          guiGraphics.drawWordWrap(
            Client.font,
            Text.of(convertString("left")).bold(),
            0,
            40,
            100,
            0
          );
          guiGraphics.drawWordWrap(
            Client.font,
            Text.of(convertString("result")).bold(),
            80,
            10,
            100,
            0
          );

          if (recipe.data.output.isCrouching) {
            guiGraphics.drawWordWrap(
              Client.font,
              Text.of(convertString("shift")),
              20,
              100,
              100,
              0
            );
          }
        }
      );
    //---------------------------------------------------------------------//
  });

  //---------------------------------------------------------------------------------------//
  //                                       RANDOMTICK                                //
  //---------------------------------------------------------------------------------------//

  event.custom("kubejs:random-tick", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Random Tick Conversion")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/randomtick.png",
          2,
          2,
          90,
          32
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("mud")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.input !== undefined &&
          recipe?.data?.output !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.input, "INPUT", 6, 7, builder);
        verify(recipe.data.output, "OUTPUT", 65, 7, builder);
      });
    //---------------------------------------------------------------------//
    //                            TEXT DRAWING                             //
    //---------------------------------------------------------------------//
    // .setDrawHandler(
    //   (recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
    //     guiGraphics.drawWordWrap(
    //       Client.font,
    //       Text.of(convertString("right")).bold(),
    //       31,
    //       4,
    //       100,
    //       0
    //     );
    //   }
    // );
    //---------------------------------------------------------------------//
  });

  //---------------------------------------------------------------------------------------//
  //                                       CROP RESULT                                     //
  //---------------------------------------------------------------------------------------//

  event.custom("kubejs:crop-result", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Crop Result")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/crop_result.png",
          2,
          2,
          148,
          52
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("carrot")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.input !== undefined &&
          recipe?.data?.output?.id !== undefined &&
          recipe?.data?.output?.tip !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.input, "INPUT", 10, 15, builder);

        let slotSize = 21;
        let slotY = 4;
        let slotX = 2;
        let tip = "";
        for (let i = 0; i < slotY; i++) {
          for (let j = 0; j < slotX; j++) {
            tip = recipe.data.output.tip[j * slotX + i];
            if (
              recipe.data.output.tip[j * slotX + i] == undefined &&
              recipe.data.output.id[j * slotX + i] != undefined
            ) {
              tip = "NAN";
            }
            verifyCrude(
              Item.of(
                recipe.data.output.id[j * slotX + i],
                `{display:{Lore:['{\"text\":\"` + tip + `\"}']}}`
              ),
              "OUTPUT",
              51 + i * slotSize,
              4 + j * slotSize,
              builder
            );
          }
        }
      });
    //---------------------------------------------------------------------//
    //                            TEXT DRAWING                             //
    //---------------------------------------------------------------------//
    // .setDrawHandler(
    //   (recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
    //     guiGraphics.drawWordWrap(
    //       Client.font,
    //       Text.of(convertString("better  that  botany")).gray(),
    //       -40,
    //       0,
    //       10,
    //       200
    //     );
    //   }
    // );
    //---------------------------------------------------------------------//
  });

  //---------------------------------------------------------------------------------------//
  //                                       BLOCK DROP                                      //
  //---------------------------------------------------------------------------------------//

  event.custom("kubejs:block-drop", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Block Drop")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/block_result.png",
          2,
          2,
          96,
          136
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("wooden_pickaxe")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.input !== undefined &&
          recipe?.data?.output?.id !== undefined &&
          recipe?.data?.output?.count !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.input, "INPUT", 37, 8, builder);
        let slotSize = 21;
        let tip = "";
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            tip = recipe.data.output.count[j * 4 + i];
            if (
              recipe.data.output.count[j * 4 + i] == undefined &&
              recipe.data.output.id[j * 4 + i] != undefined
            ) {
              tip = "NAN";
            }
            verifyCrude(
              Item.of(
                recipe.data.output.id[j * 4 + i],
                `{display:{Lore:['{\"text\":\"` + tip + `\"}']}}`
              ),
              "OUTPUT",
              6 + i * slotSize,
              47 + j * slotSize,
              builder
            );
          }
        }
      });
    //---------------------------------------------------------------------//
    //                            TEXT DRAWING                             //
    //---------------------------------------------------------------------//
    //---------------------------------------------------------------------//
  });

  //---------------------------------------------------------------------------------------//
  //                                         ATOMIC                                        //
  //---------------------------------------------------------------------------------------//

  event.custom("kubejs:atomic", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Block Infusion")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/atomic.png",
          2,
          2,
          112,
          27
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("kubejs:converter")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.input !== undefined &&
          recipe?.data?.output !== undefined &&
          Item.of("kubejs:converter") !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.input, "INPUT", 4, 4, builder);
        verify("kubejs:converter", "INPUT", 45, 3, builder);
        verify(recipe.data.output, "OUTPUT", 86, 4, builder);
      });
    //---------------------------------------------------------------------//
    //                            TEXT DRAWING                             //
    //---------------------------------------------------------------------//
    //---------------------------------------------------------------------//
  });
  //---------------------------------------------------------------------------------------//
  //                                      DYNAMO FUEL                                      //
  //---------------------------------------------------------------------------------------//

  event.custom("kubejs:dynamo-fuel", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Dynamo Fuel")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/infolabel.png",
          2,
          2,
          144,
          51
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("kubejs:dynamo")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.fuel !== undefined && recipe?.data?.info !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.fuel, "INPUT", 10, 15, builder);

        //verify(recipe.data.output, "OUTPUT", 65, 7, builder);
      })
      //---------------------------------------------------------------------//
      //                            TEXT DRAWING                             //
      //---------------------------------------------------------------------//
      .setDrawHandler(
        (recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
          guiGraphics.drawWordWrap(
            Client.font,
            Text.of(
              convertString("Base Power : ") +
                ("§a" + recipe.data.info) +
                convertString("⚡/t ")
            ),
            35,
            9,
            150,
            0
          );
        }
      );
    //---------------------------------------------------------------------//
  });

  //---------------------------------------------------------------------------------------//
  //                                TURBINE MODERATOR                                      //
  //---------------------------------------------------------------------------------------//

  event.custom("kubejs:turbine-mod", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Turbine Moderators")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/infolabel.png",
          2,
          2,
          144,
          51
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("redstone")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.fuel !== undefined && recipe?.data?.info !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.fuel, "INPUT", 10, 15, builder);

        //verify(recipe.data.output, "OUTPUT", 65, 7, builder);
      })
      //---------------------------------------------------------------------//
      //                            TEXT DRAWING                             //
      //---------------------------------------------------------------------//
      .setDrawHandler(
        (recipe, recipeSlotsView, guiGraphics, mouseX, mouseY) => {
          guiGraphics.drawWordWrap(
            Client.font,
            Text.of(convertString("Modifier : ") + recipe.data.info[0]),
            35,
            9,
            150,
            0
          );

          guiGraphics.drawWordWrap(
            Client.font,
            Text.of(
              convertString("Max Energy : ") +
                recipe.data.info[1] +
                convertString(" ⚡/t")
            ),
            35,
            30,
            150,
            0
          );
        }
      );
    //---------------------------------------------------------------------//
  });

  //---------------------------------------------------------------------------------------//
  //                                       MULTIBLOCK                                      //
  //---------------------------------------------------------------------------------------//

  event.custom("kubejs:multiblock", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("MultiBlock")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/multiblock.png",
          2,
          2,
          158,
          69
        )
      )
      .icon(guiHelper.createDrawableItemStack(Item.of("kubejs:icon_tree")))
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.controller !== undefined &&
          recipe?.data?.blocks !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verify(recipe.data.controller, "INPUT", 10, 25, builder);
        let slotSize = 21;
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 3; j++) {
            verifyCrude(
              recipe.data.blocks[j * 5 + i],
              "OUTPUT",
              51 + i * slotSize,
              4 + j * slotSize,
              builder
            );
          }
        }
      });
    //---------------------------------------------------------------------//
    //                            TEXT DRAWING                             //
    //---------------------------------------------------------------------//
    //---------------------------------------------------------------------//
  });

  //---------------------------------------------------------------------//
  //});
});

/*

      _____                   _______                   _____                   _______         
     /\    \                 /::\    \                 /\    \                 /::\    \        
    /::\    \               /::::\    \               /::\    \               /::::\    \       
    \:::\    \             /::::::\    \             /::::\    \             /::::::\    \      
     \:::\    \           /::::::::\    \           /::::::\    \           /::::::::\    \     
      \:::\    \         /:::/~~\:::\    \         /:::/\:::\    \         /:::/~~\:::\    \    
       \:::\    \       /:::/    \:::\    \       /:::/  \:::\    \       /:::/    \:::\    \   
       /::::\    \     /:::/    / \:::\    \     /:::/    \:::\    \     /:::/    / \:::\    \  
      /::::::\    \   /:::/____/   \:::\____\   /:::/    / \:::\    \   /:::/____/   \:::\____\ 
     /:::/\:::\    \ |:::|    |     |:::|    | /:::/    /   \:::\ ___\ |:::|    |     |:::|    |
    /:::/  \:::\____\|:::|____|     |:::|    |/:::/____/     \:::|    ||:::|____|     |:::|    |
   /:::/    \::/    / \:::\    \   /:::/    / \:::\    \     /:::|____| \:::\    \   /:::/    / 
  /:::/    / \/____/   \:::\    \ /:::/    /   \:::\    \   /:::/    /   \:::\    \ /:::/    /  
 /:::/    /             \:::\    /:::/    /     \:::\    \ /:::/    /     \:::\    /:::/    /   
/:::/    /               \:::\__/:::/    /       \:::\    /:::/    /       \:::\__/:::/    /    
\::/    /                 \::::::::/    /         \:::\  /:::/    /         \::::::::/    /     
 \/____/                   \::::::/    /           \:::\/:::/    /           \::::::/    /      
                            \::::/    /             \::::::/    /             \::::/    /       
                             \::/____/               \::::/    /               \::/____/        
                              ~~                      \::/____/                 ~~              
                                                       ~~                                                                                
['thoriumreactors:enriched_uranium', 'thoriumreactors:depleted_uranium']
['thoriumreactors:molten_salt', 'thoriumreactors:heated_molten_salt']

['thoriumreactors:reactor_controller', 'thoriumreactors:reactor_casing', 'thoriumreactors:reactor_valve', 'thoriumreactors:reactor_rod_controller', 'thoriumreactors:reactor_core', 'thoriumreactors:reactor_graphite_moderator', 'thoriumreactors:reactor_glass']



['minecraft:water', 'thoriumreactors:steam']
['thoriumreactors:heated_molten_salt', 'thoriumreactors:depleted_molten_salt']
['thoriumreactors:thermal_controller', 'thoriumreactors:thermal_conductor', 'thoriumreactors:thermal_valve', 'thoriumreactors:thermal_heat_sink']


'thoriumreactors:steam'
['thoriumreactors:turbine_controller', 'thoriumreactors:turbine_casing', 'thoriumreactors:turbine_valve', 'thoriumreactors:turbine_power_port', 'thoriumreactors:turbine_rotation_mount', 'thoriumreactors:turbine_vent', 'thoriumreactors:turbine_glass', 'thoriumreactors:electromagnetic_coil', 'thoriumreactors:turbine_rotor','thoriumreactors:turbine_blade']
['thoriumreactors:nickel_block', 'thoriumreactors:niob_block', 'thoriumreactors:molybdenum_block']

*/

JEIAddedEvents.registerRecipes((event) => {
  //--------HARDCODED-RECIPES--------//

  event.custom("kubejs:multiblock").add({
    controller: "minecraft:stone",
    blocks: [
      Item.of("minecraft:bedrock", 4),
      "minecraft:dirt",
      Item.of("coal", 4),
      Item.of("iron_ore", 2),
      Item.of("gold_block", 7),
      Item.of("diamond", 10),
    ],
  });

  //thorium moderators
  event.custom("kubejs:turbine-mod").add({
    fuel: "thoriumreactors:nickel_block",
    info: ["§c1.0", "§c114k"],
  });

  //thorium moderators
  event.custom("kubejs:turbine-mod").add({
    fuel: "thoriumreactors:niob_block",
    info: ["§e1.5", "§e171k"],
  });

  //thorium moderators
  event.custom("kubejs:turbine-mod").add({
    fuel: "thoriumreactors:molybdenum_block",
    info: ["§a2.0", "§a228k"],
  });

  //dynamo star fuel
  event.custom("kubejs:dynamo-fuel").add({
    fuel: "kubejs:star",
    info: 100,
  });

  //mud to clay
  event.custom("kubejs:random-tick").add({
    input: "minecraft:mud",
    output: "minecraft:clay",
  });

  //bottle-mud click
  event.custom("kubejs:click-event").add({
    input: {
      main_hand: Item.of("minecraft:potion", '{Potion:"minecraft:water"}'),
      off_hand: "",
      block: "minecraft:dirt",
      extra: "Accept any #minecraft:convertable_to_mud",
    },
    output: {
      type: "block",
      block_replace: "minecraft:mud",
      drop: [],
      chance: [],
      isCrouching: false,
      extra: "",
    },
  });

  //wheat seed
  event.custom("kubejs:crop-result").add({
    input: "minecraft:wheat_seeds",
    output: {
      id: ["minecraft:wheat_seeds", "minecraft:wheat"],
      tip: ["0-2", "1"],
    },
  });

  //torchflower seed
  event.custom("kubejs:crop-result").add({
    input: "minecraft:torchflower_seeds",
    output: { id: ["minecraft:torchflower"], tip: ["1"] },
  });

  //clay to clayball
  event.custom("kubejs:block-drop").add({
    input: "minecraft:clay",
    output: {
      id: ["minecraft:clay_ball"],
      count: [4],
    },
  });
  //stone to cobblestone
  event.custom("kubejs:block-drop").add({
    input: "minecraft:stone",
    output: {
      id: ["minecraft:cobblestone"],
      count: [1],
    },
  });

  //-------DYNAMIC-RECIPES-----------//
  global.jei.recipes.click.forEach((element) => {
    event.custom("kubejs:click-event").add(element);
  });

  global.jei.recipes.atomic.forEach((element) => {
    event.custom("kubejs:atomic").add(element);
  });

  global.jei.recipes.blockdrop.forEach((element) => {
    event.custom("kubejs:block-drop").add(element);
  });

  //---------------------------------//
});
