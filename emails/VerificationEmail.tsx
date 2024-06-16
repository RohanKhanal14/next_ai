// VerificationEmail.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Heading style={headingStyle}>Verify Your Email Address</Heading>
          </Section>
          <Section style={bodyStyle}>
            <Text style={textStyle}>Hello {username},</Text>
            <Text style={textStyle}>
              Thank you for signing up. Please click the button below to verify
              your email address and complete the registration process.
            </Text>
            <Button href={otp} style={buttonStyle}>
              Verify Email
            </Button>
            <Text style={textStyle}>
              If the button above does not work, you can also verify your email
              by clicking the link below:
            </Text>
            <Link href={otp} style={linkStyle}>
              {otp}
            </Link>
            <Text style={textStyle}>
              If you did not sign up for this account, you can ignore this
              email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const mainStyle: React.CSSProperties = {
  backgroundColor: "#f6f6f6",
  fontFamily: "Arial, sans-serif",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#ffffff",
};

const headerStyle: React.CSSProperties = {
  borderBottom: "1px solid #e0e0e0",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "24px",
  color: "#333333",
};

const bodyStyle: React.CSSProperties = {
  padding: "10px 0",
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  color: "#333333",
  lineHeight: "1.5",
};

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "200px",
  margin: "20px auto",
  padding: "10px 0",
  textAlign: "center",
  color: "#ffffff",
  backgroundColor: "#007BFF",
  borderRadius: "5px",
  textDecoration: "none",
};

const linkStyle: React.CSSProperties = {
  color: "#007BFF",
  textDecoration: "underline",
};
