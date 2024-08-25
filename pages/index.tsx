import React from 'react';
import { GetServerSideProps } from 'next';
import { BalanceSheetResponse, Row, BalanceSheetProps } from '../types/balanceSheet';
import { ENDPOINTS } from '../constants/endpoints';
import apiClient from '../interceptors/axiosInterceptor';

const Home: React.FC<BalanceSheetProps> = ({ balanceSheet }) => {
  const renderRow = (row: Row) => {
    if (row.RowType === 'Header' || row.RowType === 'Row') {
      return (
        <tr key={row.Cells ? row.Cells[0].Value : Math.random()}>
          {row.Cells && row.Cells.map((cell, index) => (
            <td key={index}>{cell.Value}</td>
          ))}
        </tr>
      );
    } else if (row.RowType === 'Section' && row.Rows) {
      return (
        <React.Fragment key={row.Title}>
          <tr>
            <td colSpan={3}><strong>{row.Title}</strong></td>
          </tr>
          {row.Rows.map(subRow => renderRow(subRow))}
        </React.Fragment>
      );
    }
  };

  return (
    <div>
      <h1>Xero Balance Sheet</h1>
      {balanceSheet.length > 0 ? (
        <table border={1}>
          <thead>
            {balanceSheet.filter(row => row.RowType === 'Header').map(renderRow)}
          </thead>
          <tbody>
            {balanceSheet.filter(row => row.RowType !== 'Header').map(renderRow)}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BalanceSheetProps> = async (context) => {
  try {
    const response = await apiClient.get<BalanceSheetResponse>(ENDPOINTS.BALANCE_SHEET);
    const balanceSheet = response.data.Reports[0].Rows;

    return {
      props: { balanceSheet },
    };
  } catch (error) {
    console.error('Error fetching balance sheet:', error);
    return {
      props: { balanceSheet: [] },
    };
  }
};

export default Home;
