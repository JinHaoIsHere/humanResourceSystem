<! DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- REACT LIBRARY-->
    <script src="https://unpkg.com/react@15.5.4/dist/react.js"></script>
    <!-- REACT DOM LIBRARY-->
    <script src="https://unpkg.com/react-dom@15.5.4/dist/react-dom.js"></script>
    <!-- BABEL LIBRARY-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.min.js"></script>
    <title>addUser</title>
</head>
<body>
    <!-- DESIGNATED LOCATION TO INSERT REACT CONTENT-->
    <div id="user">fail</div>
    <script type="text/babel"> 
    // RENDER REACT TO THE DOM - ACCEPT TWO ARGUMENTS
    ReactDOM.render(
        // REACT WHAT - VARIABLE FOR JSX
        <div>
            <h1>Create a New User</h1>
            <p>User Name * <input type="text" id="#" name="#"></input>
               First Name <input type="text" id="#" name="#"></input>
            </p>
            <p>Email * <input type="text" id="#" name="#"></input></p>
            <p>Password * <input type="text" id="#" name="#"></input></p>
            <p>Permission * <input type="text" id="#" name="#"></input></p>
            <p>Role * <input type="text" id="#" name="#"></input></p>
            <p>First Name <input type="text" id="#" name="#"></input></p>
            <p>Last Name <input type="text" id="#" name="#"></input></p>
            <p>Title <input type="text" id="#" name="#"></input></p>
            <p>Phone <input type="text" id="#" name="#"></input></p>
            <p>Address <input type="text" id="#" name="#"></input></p>
            <button>Cancel</button>
            <button>Submit</button>
        </div>,
        // REACT WHERE - LOCATION IN THE DOM
        document.getElementById("user")
    );
    </script>
</body>
</html>
