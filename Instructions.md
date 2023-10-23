# Work Instructions

## Commits Naming

### Format

[verb] category
message 

```jsx
feat login 
create login feature
```

### Verbs

- **Feat:** New feature
- **********Add:********** Add file
- ********Fix:******** Fix bug
- **************Remove:************** Remove-file/Remove-feat
- ************Merge:************ Merge branches
- ******************Refactor:****************** Refactorization
- **********Init**********: ************************************Initializate branch

### Keywords

- K************known issues:************ The commit has known issues (add issue description and create issue in repo project)

## Values

- Transparencia.
- Comunicación.
- Disciplina.
- Compromiso.

## Compromiso

- Estar disponible y activo de 8:15 a 15:00

## CSS Rules

- Usamos BEM para definir las clases siguiendo

[https://getbem.com/naming/](https://getbem.com/naming/)

- Orden de las clases:

![Untitled](Work%20Instructions%2025dc2e358a504beb94920a1f2b6fe2d4/Untitled.png)

## Arquitectura

**Organización de carpetas de componentes y páginas.** 

- Todos los componentes van en su propia carpeta, dentro de la carpeta de componentes, junto con su CSS.
- Las páginas SOLO tienen componentes en el return. Cualquier elemento, contenedor o estilo que se quiera agregar deberá de ser creado en un componente separado y agregado como tal.
- Siempre que sea posible, los componentes deben ser agnósticos de contenido. Creo el componente por un lado, y el contenido es agregado directamente dónde lo renderizo.

## Git Pushs & Pulls Requests

- Todos los push deben de ser confirmados por el equipo entero al principio del día, a menos que alguien del equipo este ausente ese día por algún motivo.