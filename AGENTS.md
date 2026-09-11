# Execution Efficiency & Agent Behavior Rules

## 1. Silent Execution & Minimal Output
- **No Setup Announcements:** Jamás escribas introducciones, saludos ni textos de confirmación (ej. "Entendido", "Voy a analizar el código", "Voy a modificar X archivo"). Prohibido usar frases de relleno.
- **Direct Code Delivery:** Realiza los cambios directamente en los archivos correspondientes utilizando tus herramientas de edición sin enviar mensajes intermedios.
- **Summary Only:** Si el usuario no pide una explicación detallada, limita tu respuesta final a 1 o 2 oraciones concisas resumiendo únicamente los cambios aplicados o el resultado final.

## 2. Resource & Token Saving (Velocity Rules)
- **Targeted Edits:** No reescribas archivos completos si solo requieres modificar un bloque o función. Usa ediciones quirúrgicas (diffs/patch) para minimizar la generación de tokens.
- **Lazy Context Fetching:** Lee únicamente los archivos estrictamente necesarios para cumplir la tarea actual. No inspecciones directorios masivos ni leas archivos secundarios a menos que haya un error explícito.
- **No Redundant Searches:** Si ya conoces la ubicación de una función o clase por el contexto previo, edita directamente sin ejecutar búsquedas repetidas (grep / find).

## 3. Strict Execution Protocol
- No generes comentarios informativos dentro del código fuente a menos que sean estrictamente requeridos para la lógica.
- Elimina cualquier llamada a `console.log()` o scripts de prueba generados durante el desarrollo antes de entregar el resultado.
- Si una tarea se completa con éxito, entrega directamente la confirmación breve y detén el bucle de razonamiento.
