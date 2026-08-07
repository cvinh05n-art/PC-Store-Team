import "./Pagination.css";
const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage
}) => {
    if (totalPages <= 1) return null;
    return (
        <div className="pagination">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                ← Trước
            </button>
            {Array.from(
                { length: totalPages },
                (_, index) => (
                    <button
                        key={index}
                        className={
                            currentPage === index + 1
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setCurrentPage(index + 1)
                        }
                    >
                        {index + 1}
                    </button>
                )
            )}
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Sau →
            </button>
        </div>
    );
};
export default Pagination;