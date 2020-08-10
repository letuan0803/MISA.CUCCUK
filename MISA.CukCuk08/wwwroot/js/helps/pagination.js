var pagination = {
    currentPage: 1,
    recordPerPage: 10,

    firstPage() {
        this.changePage(1)
    },
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            changPage(this.currentPage)
        }
    },
    nextPage() {
        if (this.currentPage < numPage()) {
            this.currentPage++;
            changPage(this.currentPage)
        }
    },
    lastPage() {
        this.changPage(this.numPage())
    },
    changePage(val) {
        console.log("changePage")
    },
    numPage() {
        return Math.ceil(fakeData.length / this.recordPerPage)
    }

}