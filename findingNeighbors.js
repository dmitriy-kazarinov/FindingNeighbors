;(function(){

    var table = [],
        global = [],
        globalResult = [];

    //*rowLength - count row in table
    //*colLength - count col in table
    //*max - max number in table
    function createTable(rowLength, colLength, max) {
        if(typeof rowLength === 'number' && typeof colLength === 'number' && typeof max === 'number'){
            var arr = [];
            for (var j = 0; j < rowLength; j++){
                for (var i = 0; i < colLength; i++) {
                    arr.push(Math.round(Math.random() * max))
                }
                table = table.concat([arr]);
                arr = [];
            }
        } else {
            //error alert
            alert('Put only numbers');
        }
    }

    //this function run in setArrayAndPoints
    function findingNeighbors(myArray, i, j) {
        var rowLimit = myArray.length - 1,
            columnLimit = myArray[0].length - 1,
            result = [],
            thisState = myArray[i][j];
        global = global.concat({row:i,col:j});
        //all neighbors
        for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
            for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
                //only horizontal and vertical neighbors
                if(x === i && y !== j || x !== i && y === j) {
                    //check with current
                    if(thisState === myArray[x][y]){
                        result.push({row:x,col:y});
                    }
                }
            }
        }
        //parse result for splice current
        for(var g = 0; g < global.length; g++){
            for(var r = 0; r < result.length; r++){
                if(global[g].row === result[r].row && global[g].col === result[r].col){
                    result.splice(r, 1);
                }
            }
        }
        globalResult = globalResult.concat(result);
    }

    //*myArray - table
    //*i - number row
    //*j - number col
    function setArrayAndPoints(myArray, i, j){
        if(Array.isArray(myArray) && typeof i === 'number' && typeof j === 'number'){
            //start
            findingNeighbors(myArray, i, j);
            for(var d = 0; d < globalResult.length; d++){
                findingNeighbors(myArray,globalResult[d].row,globalResult[d].col);
            }
            //output
            console.log(global);
            global.map(function(item){
                document.write(item.row+':'+item.col+';<br/>');
            });
        } else {
            //error alert
            alert('Put only one array and two point numbers');
        }
    }

    //create test table
    createTable(7,7,9);
    //set test array and points
    setArrayAndPoints(table,1,2);

})();
