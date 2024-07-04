import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const Page = () => {
    

    
    return (
        <div className="styles.content">
    <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Test</TableHead>
            <TableHead>Execution time</TableHead>
            <TableHead>AVG. time</TableHead>
            <TableHead className="text-right">Success rate</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {invoices.map((invoice) => (
            <TableRow key={invoice.App}>
                <TableCell className="font-medium">{invoice.App}</TableCell>
                <TableCell>{invoice.Time}</TableCell>
                <TableCell>{invoice.AVGtime}</TableCell>
                <TableCell className="text-right">{invoice.SuccessRate}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        <TableFooter>
            <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
        </div>
    )

}

export default Page