function Availablebk(){
    return(
        <>
            <h1 className="head1">book dashboard</h1>
            <div className="search">
                <form className="search-bar">
                    <label>Search for a book</label>
                    <a href="">Search</a><br/>
                </form>
                <form>
                    <input type="text"/>
                </form>
            </div>

            <h2 className="head2">Add book</h2>

            <div className="table-part">
                <table>
                    <thead>
                        <tr>
                            <th>book title</th>
                            <th>Author</th>
                            <th>ISBN number</th>
                            <th>Category</th>
                            <th>Sub-category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bad one</td>
                            <td>David</td>
                            <td>345234</td>
                            <td>fiction</td>
                            <td></td>
                            <td className="status">
                                <a href=""><button className="linkb">delete</button></a>
                               <a href="/updatebook"> <button className="linkb">update</button></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Availablebk