import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

export const ActivityDetail = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => {
        const fetchActivityDetail = async () => {
            try {
                const response = await getActivityDetail(id);
                setActivity(response.data);
                setRecommendations(response.data.recommendation);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchActivityDetail();
    }, [id]);

    if (!activity) {
        return <Typography>Loading...</Typography>
    }
    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant='h5' gutterBottom>Activity Details</Typography>
                    <Typography>Type: {activity.activityType}</Typography>
                    <Typography>Duration: 10 minutes</Typography>
                    <Typography>Calories Burned: 1000K</Typography>
                    <Typography>Date: {new Date(activity.createdAt).toLocaleString()}</Typography>
                </CardContent>
            </Card>

            {recommendations && (
                <Card>
                    <CardContent>
                        <Typography variant='h5' gutterBottom>AI Recommendation</Typography>
                        <Typography variant='h6'>Analysis</Typography>
                        <Typography paragraph>{activity.recommendation}</Typography>

                        <Divider sx={{ my: 2 }} />
                        <Typography variant='h6'>Improvements</Typography>

                        {activity.improvements.map((imporovement, index) => {
                            return <Typography key={index}>• {imporovement}</Typography>
                        })}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant='h6'>Suggestions</Typography>
                        {activity?.suggestions?.map((suggest, index) => {
                            return <Typography key={index} paragraph>• {suggest}</Typography>
                        })}
                        <Divider sx={{ my: 2 }} />

                        <Typography variant='h6'>Safety Guidelines</Typography>
                        {activity?.safety?.map((safety, index) => {
                            return <Typography key={index} paragraph>• {safety}</Typography>
                        })}


                    </CardContent>
                </Card>
            )}

        </Box>
    )
}