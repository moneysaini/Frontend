export interface Cell {
  Value: string;
}

export interface Row {
  RowType: 'Header' | 'Row' | 'Section';
  Cells?: Cell[];
  Rows?: Row[];
  Title?: string;
}

export interface BalanceSheetResponse {
  Reports: {
    ReportName: string;
    Rows: Row[];
  }[];
}

export interface BalanceSheetProps {
  balanceSheet: Row[];
}
