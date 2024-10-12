// priority: -1
StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:converter")
    .property($BooleanProperty.create("active"))
    .property(BlockProperties.NORTH)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.WEST)
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
    .blockEntity((be) => {
      be.serverTick(1, 0, (state) => {
        const { x, y, z } = state.block;
        let direc = ["north", "south", "east", "west"];
        let result = {
          active: state.persistentData.getBoolean("active"),
        };
        direc.forEach((dir) => {
          result[dir] =
            global.be.energy_links.indexOf(state.block.offset(dir).id) != -1
              ? true
              : false;
        });
        state.block.set(state.block.id, result);

        if (state.persistentData.getBoolean("active") && rnd(0, 10) == 10) {
          state.level.spawnParticles(
            "minecraft:portal",
            true,
            x + 0.1 * rnd(1, 9),
            y + 0.5 + 0.1 * rnd(1, 9),
            z + 0.1 * rnd(1, 9),
            0,
            0,
            0,
            10,
            0.1
          );
          if (state.persistentData.getBoolean("active") && rnd50()) {
            global.jei.recipes.atomic.forEach((e) => {
              const { input, output } = e;
              if (state.level.getBlock(x, y + 1, z) == input) {
                state.persistentData.putInt(
                  "amount",
                  state.persistentData.getInt("amount") - 100
                );
                state.level.spawnParticles(
                  "minecraft:flash",
                  true,
                  x,
                  y + 0.5,
                  z,
                  0,
                  0,
                  0,
                  1,
                  0.1
                );
                state.level.getBlock(x, y + 1, z).set(output);
              }
            });
          }
        }

        if (state.persistentData.getInt("amount") > 0) {
          state.persistentData.putBoolean("active", true);
        } else {
          state.persistentData.putBoolean("active", false);
        }
      });

      be.attachCapability(
        CapabilityBuilder.ENERGY.customBlockEntity()
          .canExtract(() => false)
          .canReceive(() => true)

          .receiveEnergy((energy, amount) => {
            if (amount > 1000) {
              energy.persistentData.putBoolean("active", true);
              return 1000;
            } else {
              if (energy.persistentData.getInt("amount") < 1000)
                energy.persistentData.putInt(
                  "amount",
                  amount + energy.persistentData.getInt("amount")
                );
              else {
                energy.persistentData.putInt("amount", 1000);
              }

              energy.persistentData.putBoolean(
                "active",
                amount > 0 ? true : false
              );
              return amount + energy.persistentData.getInt("amount");
            }
          })

          .getEnergyStored((energy) => {
            return energy.persistentData.getInt("amount");
          })
          .getMaxEnergyStored((energy) => {
            return 1000;
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
