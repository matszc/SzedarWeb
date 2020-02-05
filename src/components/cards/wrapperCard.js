import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";

const WrapperCard = ({maxWidth, title, children, style}) => {
    return (
        <Container maxWidth={maxWidth} style={{margin: '50px auto'}}>
            <Card style={style}>
                <CardHeader style={{marginBottom: '20px'}} title={title}/>
                <CardContent style={{padding: '10px'}}>
                    {children}
                </CardContent>
            </Card>
        </Container>
    )
};

WrapperCard.propTypes = {
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
    title: PropTypes.string,
};

export default WrapperCard
