// priority: -1

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

let baseFEgen = 100;
StartupEvents.registry("block", (event) => {
  event
    .create("dynamo")
    .property($BooleanProperty.create("active"))
    .property(BlockProperties.NORTH)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.WEST)
    .defaultCutout()
    .defaultState((state) => {
      state
        .set($BooleanProperty.create("active"), false)
        .set(BlockProperties.NORTH, false)
        .set(BlockProperties.SOUTH, false)
        .set(BlockProperties.EAST, false)
        .set(BlockProperties.WEST, false);
    })
    .placementState((state) => {
      state
        .set($BooleanProperty.create("active"), false)
        .set(BlockProperties.NORTH, false)
        .set(BlockProperties.SOUTH, false)
        .set(BlockProperties.EAST, false)
        .set(BlockProperties.WEST, false);
    })
    .rightClick((click) => {
      const { properties } = click.block;
      let direc = ["north", "south", "east", "west"];
      let obj = {};
      direc.forEach((e) => {
        obj[e] = properties.get(e);
      });

      if (click.item == "kubejs:star" && click.block.properties.get('active').toLowerCase()==='true') {
        obj["active"] = "true";
        click.block.entity.persistentData.putBoolean("active", true);
        click.block.set(click.block.id, obj);
      }
    })
    .steppedOn((step) => {
      if (step.block.properties.get("active").toLowerCase() === "true") {
        step.entity.remainingFireTicks = 30;
      }
    })
    .blockEntity((be) => {
      be.serverTick(1, 0, (state) => {
        let direc = ["north", "south", "east", "west"];
        let result = { active: state.persistentData.getBoolean("active") };
        direc.forEach((dir) => {
          result[dir] =
            global.be.energy_links.indexOf(state.block.offset(dir).id) != -1
              ? "true"
              : "false";
        });
        state.block.set(state.block.id, result);
      });
      be.attachCapability(
        CapabilityBuilder.ENERGY.customBlockEntity()
          .canExtract(() => true)
          .canReceive(() => false)

          .extractEnergy((energy) => {
            return energy.level
              .getBlock(energy.blockPos)
              .properties.get("active")
              .toLowerCase() === "true"
              ? 100
              : 0;
          })
          .getEnergyStored((energy) => {
            return energy.level
              .getBlock(energy.blockPos)
              .properties.get("active")
              .toLowerCase() === "true"
              ? 100
              : 0;
          })
          .getMaxEnergyStored((energy) => {
            return energy.level
              .getBlock(energy.blockPos)
              .properties.get("active")
              .toLowerCase() === "true"
              ? 100
              : 0;
          })
      );
    })
    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/dynamo/off",
      });
    }).blockstateJson = {
    multipart: [
      {
        when: { active: "false" },
        apply: { model: "kubejs:block/dynamo/off" },
      },
      {
        when: { active: "true" },
        apply: { model: "kubejs:block/dynamo/on" },
      },
      {
        when: { north: "true" },
        apply: { model: "kubejs:block/dynamo/parts/port" },
      },
      {
        when: { east: "true" },
        apply: { model: "kubejs:block/dynamo/parts/port", y: 90 },
      },
      {
        when: { west: "true" },
        apply: { model: "kubejs:block/dynamo/parts/port", y: -90 },
      },
      {
        when: { south: "true" },
        apply: { model: "kubejs:block/dynamo/parts/port", y: 180 },
      },
    ],
  };
});
