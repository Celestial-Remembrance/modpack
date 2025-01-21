// priority: -1
let baseFEgen = 100;
StartupEvents.registry("block", (event) => {
  event
    .create("dynamo")
    .displayName("ExoNova Sidereal Engine")
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
      if (
        click.item == "kubejs:star" &&
        click.block.properties.get("active").toLowerCase() === "false"
      ) {
        click.block.entity.persistentData.putBoolean("active", true);
        click.block.set(click.block.id, { active: "true" });
        click.level.playSound(
          null,
          click.block.x,
          click.block.y,
          click.block.z,
          "thoriumreactors:reactor.startup",
          "blocks",
          1,
          0.1*rnd(5,9)
        );
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

        if (state.persistentData.getBoolean("active")) {
          if (rndChance(0.5)) {
            state.level.playSound(
              null,
              state.block.x,
              state.block.y,
              state.block.z,
              "thoriumreactors:reactor.run",
              "blocks",
              0.5,
              0.1*rnd(5,9)
            );
          }
          state.level.spawnParticles(
            "minecraft:glow",
            true,
            state.block.x + 0.25 + 0.1 * rnd(1, 3),
            state.block.y + 0.25 + 0.1 * rnd(1, 3),
            state.block.z + 0.25 + 0.1 * rnd(1, 3),
            0,
            0,
            0,
            1,
            0
          );
        }
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
        parent: "kubejs:block/dynamo/base",
      });
    }).blockstateJson = {
    multipart: [
      {
        when: { active: "true|false" },
        apply: { model: "kubejs:block/dynamo/base" },
      },
      {
        when: { active: "true|false" },
        apply: { model: "kubejs:block/dynamo/side" },
      },
      {
        when: { north: "true" },
        apply: { model: "kubejs:block/dynamo/port" },
      },
      {
        when: { east: "true" },
        apply: { model: "kubejs:block/dynamo/port", y: 90 },
      },
      {
        when: { west: "true" },
        apply: { model: "kubejs:block/dynamo/port", y: -90 },
      },
      {
        when: { south: "true" },
        apply: { model: "kubejs:block/dynamo/port", y: 180 },
      },
    ],
  };
});
