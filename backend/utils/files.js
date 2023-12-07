import fs from 'fs/promises';
const filepath = './storage/data.json';

export function createStorage() {
  fs.access('./storage/')
    .then(() => console.log('storage ordner ist bereits vorhanden'))
    .catch(() => {
      fs.mkdir('./storage');
      console.log('storage ordner wurde erstellt');
    });
}

export function saveEntry(entry) {
  fs.access(filepath, fs.constants.F_OK)
    .then(() => fs.readFile(filepath, 'utf-8'))
    .then((data) => {
      const existingData = JSON.parse(data);
      existingData.push(entry);
      return fs.writeFile(filepath, JSON.stringify(existingData), 'utf-8');
    })
    .then(() => console.log('Eintrag wurde zu data.json hinzugefügt.'))
    .catch((error) => {
      // das ist der error code wenn man das mit dem promise verkackt hat:
      if (error.code === 'ENOENT') {
        // der teil in dem die datei erst erstellt werden muss ist jetzt hier unten:
        return fs
          .writeFile(filepath, JSON.stringify([entry]), 'utf-8')
          .then(() =>
            console.log(
              'data.json wurde erstellt und Daten wurden geschrieben.'
            )
          )
          .catch((err) =>
            console.error('Ein Fehler beim Erstellen der Datei:', err)
          );
      } else {
        console.error('Ein Fehler ist aufgetreten:', error);
      }
    });
}

export function getEntries() {
  return fs
    .readFile(filepath, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch((error) => {
      console.error('Fehler beim Lesen der Datei:', error);
    });
}

// ____________________________________________________________________________________________
//
// diese funktion ist nicht asynchron und es gibt dann wieder ein problem mit dem promise
// deswegen muss ich hier .then benutzen
// export function saveEntry(entry) {
//   fs.access(filepath, fs.constants.F_OK, (err) => {
//     if (err) {
//       fs.writeFile(filepath, JSON.stringify([entry]), 'utf8', (w_error) => {
//         if (w_error) {
//           console.log('writing error:', w_error);
//         }
//         console.log('data.json wurde erstellt und daten wurden geschrieben');
//       });
//     } else {
//       fs.readFile(filepath, 'utf8', (r_error, data) => {
//         if (r_error) {
//           console.log('reading error:', r_error);
//         }
//         const existingData = JSON.parse(data);
//         existingData.push(entry);

//         fs.writeFile(
//           filepath,
//           JSON.stringify(existingData),
//           'utf8',
//           (w_error) => {
//             if (w_error) {
//               console.log('writing error:', w_error);
//             }
//             console.log('entry wurde zu data.json hinzugefügt');
//           }
//         );
//       });
//     }
//   });
// }
