import Link from 'next/link';
import Router from 'next/router';
import InformationParagraph from 'src/components/shared/information-paragraph';

const CardAlbumEmailNotVerified = () => {
  return (
    <>
      <InformationParagraph className="mt-5">
        To start collecting your cards, please verify your email, <br />
        if you are having trouble finding the verification email in your inbox, please check your spam.
      </InformationParagraph>
      <InformationParagraph className="mb-5 mt-4">
        If you verified your email, please refresh the page or{' '}
        <Link href={'#'}>
          <a
            onClick={() => {
              Router.reload();
            }}
          >
            click here.
          </a>
        </Link>
      </InformationParagraph>
    </>
  );
};

export default CardAlbumEmailNotVerified;
