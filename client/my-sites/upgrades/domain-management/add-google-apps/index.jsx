/**
 * External dependencies
 */
const React = require( 'react' ),
	page = require( 'page' );

/**
 * Internal dependencies
 */
const Main = require( 'components/main' ),
	Header = require( 'my-sites/upgrades/domain-management/components/header' ),
	AddEmailAddressesCard = require( './add-email-addresses-card' ),
	paths = require( 'my-sites/upgrades/paths' ),
	{ canAddEmail } = require( 'lib/domains' ),
	SectionHeader = require( 'components/section-header' );

const AddGoogleApps = React.createClass( {
	componentDidMount() {
		this.ensureCanAddEmail();
	},

	componentDidUpdate() {
		if ( this.props.selectedSite ) {
			this.ensureCanAddEmail();
		}
	},

	ensureCanAddEmail() {
		const needsRedirect = (
			this.props.domains.hasLoadedFromServer &&
			! canAddEmail( this.props.domains.list )
		);

		if ( needsRedirect ) {
			const path = paths.domainManagementEmail(
				this.props.selectedSite.domain,
				this.props.selectedDomainName
			);

			page.replace( path );
		}
	},

	render() {
		if ( ! this.props.selectedSite ) {
			// `selectedSite` is false for a render when leaving for an all-sites route
			return null;
		}

		return (
			<Main className="domain-management-add-google-apps">
				<Header
					onClick={ this.goToEmail }
					selectedDomainName={ this.props.selectedDomainName }>
					{ this.translate( 'Add Google Apps' ) }
				</Header>

				<SectionHeader label={ this.translate( 'Add Google Apps' ) } />

				<AddEmailAddressesCard
					domains={ this.props.domains }
					selectedDomainName={ this.props.selectedDomainName }
					selectedSite={ this.props.selectedSite } />
			</Main>
		);
	},

	goToEmail() {
		const path = paths.domainManagementEmail(
			this.props.selectedSite.domain,
			this.props.selectedDomainName
		);

		page( path );
	}
} );

module.exports = AddGoogleApps;
