
//* The following API routes should be created:


module.exports = function (app){
    app.get("/api/notes", function(req, res){
         // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
        fs.readFile("./db/db.json", "utf8", (err, data) => { //In order to delete a note, you'll need to read all notes from the `db.json` file,
            if (err) throw err;
            res.send(JSON.parse(data))
        })   
    });

    app.post("/api/notes", function(req, res){
        let noteId = uuidv4()
        let newNote = {
            id : noteId,
            title: req.body.title,
            text: req.body.text //* POST `/api/notes` - Should receive a new note to save on the request body
        };
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const savedNotes = JSON.parse(data)
            savedNotes.push(newNote) 
            fs.writeFile("./db/db.json", JSON.stringify(savedNotes, null, 2), err => { //, add it to the `db.json` file
                if (err) throw err;
                 //, and then return the new note to the client.
                console.log("Your new note is created!")
            });
        });
        fs.readFile("./db/db.json", "utf8", (err, data) => { //In order to delete a note, you'll need to read all notes from the `db.json` file,
            if (err) throw err;
            res.send(JSON.parse(data))
        })   
    });
    app.delete("/api/notes/:id", function(req, res){
        let noteId = req.params.id //* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
        fs.readFile("./db/db.json", "utf8", (err, data) => { //In order to delete a note, you'll need to read all notes from the `db.json` file,
            if (err) throw err;
            const allNote = JSON.parse(data)
            const newAllNote = allNote.filter(note => note.id != noteId) //remove the note with the given `id` property, 

            fs.writeFile("./db/db.json", JSON.stringify(newAllNote, null, 2), err => { //and then rewrite the notes to the `db.json` file.
                if (err) throw err;
                
                console.log("Your Note is deleted!")
            })
        });
        
        fs.readFile("./db/db.json", "utf8", (err, data) => { //In order to delete a note, you'll need to read all notes from the `db.json` file,
        if (err) throw err;
        res.send(JSON.parse(data))
    })   
    })
    
};





