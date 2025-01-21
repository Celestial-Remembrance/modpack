//priority : -1
JEIAddedEvents.registerCategories((event) => {
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
  //                                     MACHINE OUTPUT                                    //
  //---------------------------------------------------------------------------------------//
  event.custom("kubejs:machine-output", (category) => {
    const {
      jeiHelpers,
      jeiHelpers: { guiHelper },
    } = category;
    category
      .title("Block Infusion")
      .background(
        guiHelper.createDrawable(
          "kubejs:textures/gui/output.png",
          2,
          2,
          112,
          27
        )
      )
      .icon(
        guiHelper.createDrawableItemStack(
          Item.of("thoriumreactors:reactor_controller")
        )
      )
      //---------------------------------------------------------------------//
      //                            SLOT VALIDATOR                           //
      //---------------------------------------------------------------------//
      .isRecipeHandled((recipe) => {
        return !!(
          recipe?.data?.input?.id !== undefined &&
          recipe?.data?.output?.id !== undefined &&
          recipe?.data?.input?.type !== undefined &&
          recipe?.data?.output?.type !== undefined &&
          recipe?.data?.machine !== undefined
        );
      })
      //---------------------------------------------------------------------//
      //                            SLOT IO                                  //
      //---------------------------------------------------------------------//
      .handleLookup((builder, recipe, focuses) => {
        verifyMixed(
          recipe.data.input.type,
          recipe.data.input.id,
          "INPUT",
          4,
          4,
          builder
        );
        verify(recipe.data.machine, "INPUT", 45, 3, builder);
        verifyMixed(
          recipe.data.output.type,
          recipe.data.output.id,
          "OUTPUT",
          86,
          4,
          builder
        );
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
            15,
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
          recipe?.data?.structure !== undefined
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
              recipe.data.structure[j * 5 + i],
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





*/

JEIAddedEvents.registerRecipes((event) => {
  //--------HARDCODED-RECIPES--------//
  event.custom("kubejs:machine-output").add({
    input: {
      id: "thoriumreactors:enriched_uranium",
      type: "item",
    },
    machine: "thoriumreactors:reactor_controller",
    output: {
      id: "thoriumreactors:depleted_uranium",
      type: "item",
    },
  });
  event.custom("kubejs:machine-output").add({
    input: {
      id: 'thoriumreactors:molten_salt',
      type: "fluid",
    },
    machine: "thoriumreactors:reactor_controller",
    output: {
      id: 'thoriumreactors:heated_molten_salt',
      type: "fluid",
    },
  });

  event.custom("kubejs:machine-output").add({
    input: {
      id: 'minecraft:water',
      type: "fluid",
    },
    machine: "thoriumreactors:thermal_controller",
    output: {
      id: 'thoriumreactors:steam',
      type: "fluid",
    },
  });

  event.custom("kubejs:machine-output").add({
    input: {
      id: 'thoriumreactors:heated_molten_salt',
      type: "fluid",
    },
    machine: "thoriumreactors:thermal_controller",
    output: {
      id: 'thoriumreactors:depleted_molten_salt',
      type: "fluid",
    },
  });

  event.custom("kubejs:machine-output").add({
    input: {
      id: 'thoriumreactors:steam',
      type: "fluid",
    },
    machine: "thoriumreactors:turbine_controller",
    output: {
      id: 'mekanism:energy_tablet',
      type: "item",
    },
  });

  event.custom("kubejs:multiblock").add({
    controller: "thoriumreactors:reactor_controller",
    structure: [
      Item.of("thoriumreactors:reactor_casing", 61),
      Item.of("thoriumreactors:reactor_glass", 31),
      Item.of("thoriumreactors:reactor_valve", 4),
      Item.of("thoriumreactors:reactor_controller", 1),
      Item.of("thoriumreactors:reactor_graphite_moderator", 2),
      Item.of("thoriumreactors:reactor_core", 1),
      Item.of("thoriumreactors:reactor_rod_controller", 1),
    ],
  });

  event.custom("kubejs:multiblock").add({
    controller: "thoriumreactors:thermal_controller",
    structure: [
      Item.of("thoriumreactors:thermal_controller", 1),
      Item.of("thoriumreactors:thermal_conductor", 25),
      Item.of("thoriumreactors:thermal_valve", 4),
      Item.of("thoriumreactors:thermal_heat_sink", 15),
    ],
  });

  event.custom("kubejs:multiblock").add({
    controller: "thoriumreactors:turbine_controller",
    structure: [
      Item.of("thoriumreactors:turbine_controller", 1),
      Item.of("thoriumreactors:turbine_casing", 68),
      Item.of("thoriumreactors:turbine_valve", 1),
      Item.of("thoriumreactors:turbine_power_port", 1),
      Item.of("thoriumreactors:turbine_rotation_mount", 2),
      Item.of("thoriumreactors:turbine_vent", 12),
      Item.of("thoriumreactors:turbine_glass", 45),
      Item.of("thoriumreactors:electromagnetic_coil", 8),
      Item.of("thoriumreactors:turbine_rotor", 5),
      Item.of("thoriumreactors:turbine_blade", 24),
      Item.of(
        "thoriumreactors:molybdenum_block",
        8,
        `{display:{Lore:['{\"text\":\"any #kubejs:moderators\"}']}}`
      ),
    ],
  });

  //thorium moderators
  event.custom("kubejs:turbine-mod").add({
    fuel: Item.of("thoriumreactors:nickel_block", 8),
    info: ["§c1.0", "§c114k"],
  });

  //thorium moderators
  event.custom("kubejs:turbine-mod").add({
    fuel: Item.of("thoriumreactors:niob_block", 8),
    info: ["§e1.5", "§e171k"],
  });

  //thorium moderators
  event.custom("kubejs:turbine-mod").add({
    fuel: Item.of("thoriumreactors:molybdenum_block", 8),
    info: ["§a2.0", "§a228k"],
  });

  //dynamo star fuel
  event.custom("kubejs:dynamo-fuel").add({
    fuel: "kubejs:star",
    info: 100,
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

  global.jei.recipes.blockdrop.forEach((element) => {
    event.custom("kubejs:block-drop").add(element);
  });

  //---------------------------------//
});
