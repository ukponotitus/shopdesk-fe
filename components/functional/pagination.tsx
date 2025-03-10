"use client"
import React from "react"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChangeAction: (page: number) => void
  onPageSizeChangeAction: (size: number) => void
}

const PAGE_SIZE_OPTIONS = [5,10, 20, 30, 50]

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChangeAction,
  onPageSizeChangeAction,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChangeAction(page)
    }
  }

  const getPageNumbers = () => {
    const pageNumbers = []

    pageNumbers.push(1)

    if (currentPage > 3) {
      pageNumbers.push("...")
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pageNumbers.includes(i) && i !== 1 && i !== totalPages) {
        pageNumbers.push(i)
      }
    }
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...")
    }
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }
    return pageNumbers
  }

  return (
    <div className="w-full flex flex-col gap-3 md:flex-row px-[1.5rem] py-[1.2rem] justify-between">
      <div className="text-[0.75rem] md:text-[1rem] text-muted-foreground mb-2 sm:mb-0 w-full border-0 my-3">
        You have <span className="font-bold text-black">{totalItems}</span> stock (Displaying
        <DropdownMenu>
          <DropdownMenuTrigger className="px-1 font-bold text-black inline-flex items-center hover:bg-accent hover:text-accent-foreground rounded">
            {pageSize}
            <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <DropdownMenuItem key={size} onClick={() => onPageSizeChangeAction(size)}>
                {size}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        per page)
      </div>

<div className="flex items-center rounded-2xl border justify-end py-2 px-2 sm:px-4  whitespace-nowrap gap-2">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`flex items-center sm:px-4 px-2 py-1 rounded-sm ${
      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    }`}
    aria-label="Previous page"
  >
    <ArrowLeft className="h-4 w-4" />
    <span className="ml-1 hidden sm:inline">Previous</span>
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
    className={`flex items-center sm:px-4 px-2 py-1 ${
      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    }`}
    aria-label="Next page"
  >
    <span className="mr-1 hidden sm:inline">Next</span>
    <ArrowRight className="h-4 w-4" />
  </button>
</div>

    </div>
  )
}

