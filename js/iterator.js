export default{

    iter_color : ["#FFF222","#e36714"],

    insertIter: async function (objects,i,color)
    {
        if (i>=0 && i<objects.length)
        objects[i].style.backgroundColor = this.iter_color[color];
    },

    delIter: async function (objects, i)
    {
        if (i>=0 && i<objects.length)
        objects[i].style.backgroundColor = 'white';
    },

    AtEnd: async function(objects, current_speed, height_obj)
    {
        for (let obj of objects)
        {
            let h = await height_obj(obj);
            obj.style.backgroundColor = this.iter_color[0];
            await sleep(current_speed);
            obj.title = h + " px";
        }
        for (let obj of objects)
        {
            obj.style.backgroundColor = "white";
            await sleep(current_speed);
        }
    }
};