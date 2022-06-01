import { useState } from "react"
import { TableItem } from "../model/TableModel"

type CompareFn<T> = (a: T, b: T) => -1 | 0 | 1
type SortTableFn<T> = (comparator: CompareFn<T>) => void

const toString = (obj: any) => {
  //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-tostring

  if (obj === null) return "null"

  if (typeof obj === "boolean" || typeof obj === "number") return obj.toString()

  if (typeof obj === "string") return obj

  if (typeof obj === "symbol") throw new TypeError()

  //we know we have an object. perhaps return JSON.stringify?
  return obj.toString()
}

export const defaultCompare: CompareFn<any> = (x, y) => {
  //INFO: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  //ECMA specification: http://www.ecma-international.org/ecma-262/6.0/#sec-sortcompare
  //Modified to accept null values and convert to same case.

  x = x === null ? undefined : x
  y = y === null ? undefined : y

  if (x === undefined && y === undefined) return 0

  if (x === undefined) return 1

  if (y === undefined) return -1

  const xString = toString(x).toUpperCase()
  const yString = toString(y).toUpperCase()

  if (xString == yString) return 0

  if (xString < yString) return -1

  if (xString > yString) return 1

  return 0
}

export const getDefaultCompareFn = <T>(key: keyof T): CompareFn<T> => {
  return (a: T, b: T) => defaultCompare(a[key], b[key])
}

export const useCollection = <T>(
  data: T[],
  trackBy: (item: T) => string
): [TableItem<T>[], SortTableFn<T>] => {
  const [tableItems, setTableItems] = useState(
    data.map((item) => ({ ...item, key: trackBy(item) }))
  )

  const sortTable = (comparator: CompareFn<T> | keyof T, ascending = false) => {
    const itemsToSort = [...tableItems]
    if (comparator instanceof Function) {
      itemsToSort.sort(comparator)
    } else {
      itemsToSort.sort((a, b) => defaultCompare(a[comparator], b[comparator]))
    }
    if (ascending) {
      itemsToSort.reverse()
    }
    setTableItems(itemsToSort)
  }

  return [tableItems, sortTable]
}
