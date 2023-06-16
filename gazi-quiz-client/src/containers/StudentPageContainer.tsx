import {Box} from '@mui/material';
import Container from '@mui/material/Container';

interface StudentPageContainerProps {
    children: any;
}

const StudentPageContainer = (props: StudentPageContainerProps) => {
    const { children } = props;

    return (
        <Box paddingY={4}>
            <Container maxWidth="md">{children}</Container>
        </Box>
    );
};

export default StudentPageContainer;
