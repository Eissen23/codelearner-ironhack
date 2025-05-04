import { useEffect, useState } from 'react';
import { getProblemSet } from '../../../service/api/problem-set-manage/getProblemSet';
import { ProblemSet } from '../../../types/org/problem_set.type';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const ProblemSetList = () => {
    const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProblemSets = async () => {
            try {
                const response = await getProblemSet();
                setProblemSets(response.problem_sets);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch problem sets');
                setIsLoading(false);
            }
        };

        fetchProblemSets();
    }, []);

    if (isLoading) return (
        <Container className="d-flex justify-content-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );

    if (error) return (
        <Container className="mt-3">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container className="py-4">
            <Row xs={1} md={2} lg={3} className="g-4">
                {problemSets.map((problemSet) => (
                    <Col key={problemSet.id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <Card.Title>{problemSet.name}</Card.Title>
                                <Card.Text>{problemSet.short_description}</Card.Text>
                                <div className="text-muted small">
                                    <p className="mb-1">Created: {new Date(problemSet.created_at).toLocaleDateString()}</p>
                                    <p className="mb-0">Expires: {new Date(problemSet.expired_at).toLocaleDateString()}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProblemSetList;
