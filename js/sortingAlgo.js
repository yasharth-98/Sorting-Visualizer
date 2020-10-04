import iterator from './iterator.js';


//......................................Yasharth Singh Parihar.............................................//
class SortingAlgo
{
    constructor(objects, speed)
    {
        this.objects = objects;
        this.inProgress = false;
        this.size = objects.length;
        this.speed = speed;
    }

    setObjects(objects)
    {
        this.objects = objects;
        this.size = objects.length;
    }

    setSpeed(speed)
    {
        this.speed = speed;
    }

    //........................Bubble Sort.........................//
    async bubbleSort()
    {
        this.inProgress = true;
        var n = this.size, i = 0, end = n-1;

        for (; i<n-1; i++)
        {
            var isSorted = true, j = 0;

            for(; j<n-1-i; j++)
            {
                await iterator.insertIter(this.objects,j,0);
                await sleep(100-this.speed);

                if (await this.height(j)> await this.height(j+1))
                {
                    await this.swap(j,j+1);
                    isSorted = false;
                    await sleep(100-this.speed);
                }
                await iterator.delIter(this.objects,j);
            }
            if (isSorted)
            {
                if (end<n-1)
                for (; end>0;end--)
                {
                    await iterator.insertIter(this.objects,end,1);
                    await sleep(100-this.speed);
                }
                break;
            }
            await iterator.insertIter(this.objects,end,1);
            end--;
        }
        await iterator.AtEnd(this.objects,100-this.speed,this.height_obj);
        this.inProgress = false;
    }

//....................Insertion Sort.................................//
    async insertionSort()
    {
        this.inProgress = true;
        var n = this.size;
        var i = 1;
        for(; i<n; i++)
        {
            await iterator.insertIter(this.objects,i,1);
            await sleep(100-this.speed);
            var key = await this.height(i), j = i-1;
            while (j>=0 && await this.height(j)> key) 
            {
                await this.assign(j,j+1, "index");
                j--;
                await sleep(100-this.speed);    
            }

            await iterator.insertIter(this.objects, j+1,0);
            await sleep(100-this.sleep);
            
            await this.assign(key,j+1,"height");
            await sleep(100-this.speed);
            await iterator.delIter(this.objects,j+1);
            await iterator.delIter(this.objects,i);
            await sleep(100-this.speed);
        }
        await iterator.AtEnd(this.objects,100-this.speed,this.height_obj);
        this.inProgress = false;
    }

    //............................Merge Sort........................//

    async merge_sort(start, end)
    {
        if(start >= end) return;

        var mid = parseInt(start + (end-start)/2);
        await this.merge_sort(start,mid);
        await this.merge_sort(mid+1, end);
        await iterator.insertIter(this.objects,start,0);
        await iterator.insertIter(this.objects,end,0);
        await this.merge(start, end);
        await iterator.delIter(this.objects,start);
        await iterator.delIter(this.objects, end);
    }

    //......................for merging.....................//
    async merge(start,end)
    {
        var mid = parseInt(start + (end-start)/2);
        var temp = [];
        var i = start, j = mid+1, k=0;
        while(i<=mid && j<=end)
        {
            let height_of_i = await this.height(i);
            let height_of_j = await this.height(j);
            if (height_of_i<height_of_j) 
            {
                temp.push(height_of_i);
                i++    
            }
            else
            {
                temp.push(height_of_j);
                j++;
            }
        }
        while (i<=mid) 
        {
            temp.push(await this.height(i));
            i++;
        }
        while (j<=mid) 
        {
            temp.push(await this.height(j));
            j++;    
        }
        for(let i=start, k = 0; i<=end;i++,k++)
        {
            await this.assign(temp[k], i, "height");
            if(i!=start && i!=end)
            {
                await iterator.insertIter(this.objects,i,1);
                await sleep(100-this.speed);
            }
        }
        for(i = start+1; i<end; i++)
        {
            await iterator.delIter(this.objects, i);
        }
    }

    //...............final merge......................//

    async mergeSort()
    {
        this.inProgress = true;
        var start = 0, end = this.size-1;
        await this.merge_sort(start,end);
        await iterator.AtEnd(this.objects, 100-this.speed, this.height_obj);
        this.inProgress = false;
    }
    //...............Selection Sort.....................//

    async selectionSort()
    {
        this.inProgress = true;
        var n = this.size;
        for(let i = 0; i<n-1; i++)
        {
            var minimum = await this.height(i), min_index = i;
            for(let j = i+1; j<n ; j++)
            {
                var current_height = await this.height(j);
                await iterator.insertIter(this.objects,j,0);
                await sleep(100-this.speed);
                if(current_height<minimum)
                {
                    minimum = current_height;
                    min_index = j;
                }
                await iterator.delIter(this.objects,j);
            }
            await this.swap(min_index, i, "index");
            await iterator.insertIter(this.objects,i,1);
            await sleep(100-this.sleep);
        }
        await iterator.AtEnd(this.objects,100-this.speed,this.height_obj);
        this.inProgress = false;
    }

    //.....................Quick Sort........................//
    async quick_sort(start, end) //function
    {
        if (start>=end) 
        {
            return;    
        }
        await iterator.insertIter(this.objects,end,2);
        var pivot = await this.height(end), i = -1, j=0;
        
        for(;j<end;j++)
        {
            var current_height = await this.height(j);
            await iterator.insertIter(this.objects,j,0);
            await sleep(101-this.sleep);
            await iterator.delIter(this.objects,j);
            if(current_height <= pivot)
            {
                i++;
                await this.swap(i,j);
                await sleep(101-this.sleep);
                await iterator.insertIter(this.objects,i,1);
            }
        }

        await this.swap(i+1,end);
        await iterator.delIter(this.objects,end);
        await iterator.insertIter(this.objects,i+1);

        for(let x = 0; x<=i+1; x++)
        {
            await iterator.delIter(this.objects,x);
            await sleep(101-this.speed);
        }
        await this.quick_sort(start,i);
        await this.quick_sort(i+2,end);
    }

    //...........Final Quick..........................//

    async quickSort()
    {
        this.inProgress = true;
        var start = 0, end = parseInt(this.size-1);
        await this.quick_sort(start,end);
        await iterator.AtEnd(this.objects,101-this.speed,this.height_obj);
        this.inProgress = false;
    }

    //..........................Heap Sort....................//

    async downHeapify(p,n){
        await iterator.insertIter(this.objects,p,0);
        let lChild = (parseInt(p) * 2) + 1, rChild = (parseInt(p) * 2) + 2;
        if(lChild<n)
        await iterator.insertIter(this.objects,lChild,1);
        if(rChild<n)
        await iterator.insertIter(this.objects,rChild,1);
        await sleep(110 - this.speed);
        if(lChild >= n  && rChild >= n)
        return;
        let max_index = p
        if(lChild < n && await this.height(lChild) > await this.height(max_index))
        max_index = lChild;
        if(rChild < n && await this.height(rChild) > await this.height(max_index))
        max_index = rChild;
        
        if(p != max_index){
            await this.swap(max_index,p);
            await sleep(110 - this.speed);
            await iterator.insertIter(this.objects,p,0);
            await iterator.insertIter(this.objects,max_index,1);
            await iterator.delIter(this.objects,p);
            await iterator.delIter(this.objects,rChild);
            await iterator.delIter(this.objects,lChild);
            await this.downHeapify(max_index,n);
        }
        await iterator.delIter(this.objects,p);
        await iterator.delIter(this.objects,rChild);
        await iterator.delIter(this.objects,lChild);
    }

    //...........make Heap.................//
    async makeHeap(n){
        var start = parseInt(parseInt(n)/2 + 1);
        for(let i = start; i >= 0; i--){
            await this.downHeapify(i,n);
        }
    }

    async heap_sort(start,end){
        await this.makeHeap(end+1);
        for(let i = end; i>=1; i--)
        {
            await this.swap(0,i);
            await sleep(110 - this.speed);
            await this.downHeapify(0,i);
            await iterator.insertIter(this.objects,i,2);
        }
    }

    //....................final heap.......................//

    async heapSort(){
        this.inProgress = true;
        await this.heap_sort(0,this.size-1);
        await iterator.AtEnd(this.objects,120-this.speed,this.height_obj);
        this.inProgress = false;
    }

//..................Swap Function.......................//
    async swap(i,j)
    {
        let temp = this.objects[i].style.height;
        this.objects[i].style.height = this.objects[j].style.height;
        this.objects[j].style.height = temp;
    }

    async assign(source, destination, assigned_to)
    {
        switch (assigned_to) {
            case "index": this.objects[destination].style.height = this.objects[source].style.height;break;
            case "height": this.objects[destination].style.height = source +"px"; break;
            case "object": this.objects[destination].style.height = source.style.height; break;
            default: return;
        }
    }

    //.........................Height......................//
    async height(i)
    {
        let s = this.objects[i].style.height;
        return parseInt(s.slice(0,s.length-2));
    }

    height_obj(obj)
    {
        var h = obj.style.height;
        return parseInt(h.slice(0,h.length-2));
    }
}

export default SortingAlgo;