import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe((evento) => {
    const jugador = evento.source;
    const item = evento.itemStack;

    // Solo el cable de aluminio
    if (item.typeId !== "electricidad:cable_aluminio") {
        return;
    }

    // Busca el bloque que está mirando el jugador
    const objetivo = jugador.getBlockFromViewDirection({
        maxDistance: 6
    });

    if (!objetivo) {
        return;
    }

    const bloque = objetivo.block;
    const cara = objetivo.face;

    // Posición donde aparecerá el cable
    const ubicacion = {
        x: bloque.location.x + 0.5,
        y: bloque.location.y + 1.05,
        z: bloque.location.z + 0.5
    };

    // Crear el cable de aluminio
    jugador.dimension.spawnEntity(
        "electricidad:cable_electrico",
        ubicacion
    );
});
