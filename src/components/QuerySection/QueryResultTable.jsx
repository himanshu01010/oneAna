import { FiLoader } from 'react-icons/fi';
import * as S from '../StyledComponents/QueryResultTableStyle';

const QueryResultTable = ({ data, columns, isLoading }) => {
  if (isLoading) {
    return (
      <S.LoadingMessage>
        <FiLoader className="animate-spin" size={24} />
        Loading results...
      </S.LoadingMessage>
    );
  }

  if (!data || data.length === 0) {
    return <S.EmptyMessage>No data to display</S.EmptyMessage>;
  }

  return (
    <S.TableContainer>
      <S.StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <S.TableHeader key={column}>{column}</S.TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <S.TableRow key={rowIndex}>
              {columns.map((column) => (
                <S.TableCell key={`${rowIndex}-${column}`}>
                  {row[column] === null ? 'NULL' : String(row[column])}
                </S.TableCell>
              ))}
            </S.TableRow>
          ))}
        </tbody>
      </S.StyledTable>
    </S.TableContainer>
  );
}

export default QueryResultTable;