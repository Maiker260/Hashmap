class HashMap {
    constructor () {
        this.bucketSize = 16;
        this.bucket = new Array(this.bucketSize).fill(null);
        this.load = 0.75;
    }

    // Create Hash Code
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.bucketSize;
    }

    // Resize Bucket Size if it is almost Full Size
    resize() {
        const bucketLength = this.length();
        
        // Calculate when the bucket is almost full size
        let loadFactor = this.bucketSize * this.load;

        if (bucketLength >= loadFactor) {
            const oldBucket = this.bucket;
            this.bucketSize *= 2;
            this.bucket = new Array(this.bucketSize).fill(null);

            oldBucket.forEach(entry => {
                this.bucket.push(entry)
            })
        }
    }

    set(key, value) {
        let hashCodeSet = this.hash(key);
        
        this.resize();

        this.bucket[hashCodeSet] = value;
    }

    get(key) {
        let hashCodeGet = this.hash(key);

        if (this.bucket[hashCodeGet]) {
            return this.bucket[hashCodeGet];
        }

        return null;
    }

    has(key) {
        let hashCodeHas = this.hash(key);

        if (this.bucket[hashCodeHas]) {
            return true;
        }

        return false;
    }

    remove(key) {
        let hashCodeRemove = this.hash(key);

        if (this.bucket[hashCodeRemove]) {
            this.bucket[hashCodeRemove] = null;
            return true;
        }

        return false;
    }

    length() {
        let totalKeys = 0;

        for (let i = 0; i < this.bucketSize; i ++) {
            if (this.bucket[i]) {
                totalKeys += 1;
            }
        }

        return totalKeys;
    }

    clear() {
        for (let i = 0; i < this.bucketSize; i ++) {
            if (this.bucket[i]) {
                this.bucket[i] = null;
            }
        }
    }

    keys() {
        return this.bucket;
    }

    values() {
        const allValues = [];

        for (const value of this.bucket) {
            if (value) {
                allValues.push(value);
            }
        }

        return allValues;
    }

    entries() {
        const allEntries = [];

        for (let i = 0; i < this.bucketSize; i++) {
            if (this.bucket[i]) {
                allEntries.push([i, this.bucket[i]])
            }
        }

        return allEntries;
    }


}

// const list = new HashMap();

// list.set("carlos", "I am the old value.");
// list.set("carlos", "I am the new value.");

// console.log(list.get("carlos")); // I am the new value.

// console.log(list.has("carmen")); // False

// console.log(list.remove("carlos")); // True
// console.log(list.has("carlos")); // False

// list.set("carlos", "I am Carlos");
// list.set("carmen", "I am Carmen");
// console.log("Length: " + list.length()); // 2

// list.clear();

// list.set("carlos", "I am Carlos");
// list.set("carmen", "I am Carmen");
// console.log(list.values()); // ["I am Carmen", "I am Carlos"]

// console.table(list.keys());

// console.log(list.entries()); // [ [2, "I am Carmen"], [12, "I am Carlos"] ]