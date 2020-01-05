import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import React from "react";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";

const WrapperCard = ({maxWidth, title, children}) => {
    return (
        <Container maxWidth={maxWidth}>
            <Card>
                <CardHeader title={title}/>
                <CardContent>
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
