"use client"
import React from "react"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StockItem } from "@/app/(dashboard)/dashboard/page"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChangeAction: (page: number) => void
  onPageSizeChangeAction: (size: number) => void
  stockItems:StockItem[]
}
const PAGE_SIZE_OPTIONS = [5,10, 20, 30, 50]


export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChangeAction,
  onPageSizeChangeAction,
  stockItems,
}: PaginationProps) {

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChangeAction(page)
    }
  }

  const onPageSizeChange = (size: number) => {
    onPageSizeChangeAction(size)
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages - 1, totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }
    return pageNumbers
  }

  return (
    <div className="w-full flex gap-3 sm:flex-row flex-wrap px-[1rem] max-[520px]:px-[0.5rem] max-[320px]:text-[7px] max-[520px]:text-[12px] max-[824px]:px-[0.5rem] max-[824px]:text-[0.85rem] py-[1.2rem] justify-between ">
      <div className=" md:[1rem] text-muted-foreground flex items-center text-wrap leading-5 ">
        <span className="mr-1">You have</span>
        <span className="font-bold text-foreground">{totalItems}</span>
        <span className="mx-1">stock</span>
        <span className="">
          (Displaying
          <DropdownMenu>
            <DropdownMenuTrigger className="px-1 font-bold text-foreground inline-flex items-center hover:bg-accent hover:text-accent-foreground rounded">
              {pageSize}
              <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {PAGE_SIZE_OPTIONS.map((size) => (
                <DropdownMenuItem key={size} onClick={() => onPageSizeChange(size)}>
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          per page)
        </span>
      </div>
      {stockItems && stockItems.length > 0 ? (<>
      {/* Desktop pagination with page numbers */}
      <div className="hidden md:flex  items-center rounded-2xl border justify-end py-2 px-4 whitespace-nowrap gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-1 rounded-sm ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Previous page"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="ml-1">Previous</span>
        </button>

        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 py-1 border border-[#DEE5ED]">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(Number(page))}
                className={`px-3 py-1 min-w-[28px] text-sm font-medium text-center border border-[#DEE5ED] ${
                  currentPage === page ? "bg-[#F6F8FA] text-black" : "cursor-pointer hover:bg-[#F6F8FA]"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-1 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Next page"
        >
          <span className="mr-1">Next</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {/* Mobile pagination with just arrows and page count */}
      <div className="flex md:hidden items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Previous page"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          aria-label="Next page"
        >
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      </>): <></>}
    </div>
  )
}

