import ts from "typescript";
import { createCommentStatement } from "../../utils/createCommentStatement";
import type { Officer } from "../../types/officers";

async function generateOfficers(officers: Array<Officer>) {
	console.log("Generating officers type file...");

	const statements = new Array<ts.Statement>();

	statements.push(
		createCommentStatement(
			" THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED BY HAND!",
		),
	);

	statements.push(
		ts.factory.createInterfaceDeclaration(
			ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
			ts.factory.createIdentifier("Officer"),
			undefined,
			undefined,
			[
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("title"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("name"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("linkedIn"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("year"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("semester"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("imageUrl"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
			],
		),
	);

	statements.push(
		ts.factory.createVariableStatement(
			ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
			ts.factory.createVariableDeclarationList(
				[
					ts.factory.createVariableDeclaration(
						ts.factory.createIdentifier("officers"),
						undefined,
						ts.factory.createArrayTypeNode(
							ts.factory.createTypeReferenceNode("Officer"),
						),
						ts.factory.createArrayLiteralExpression([
							...officers.map((officer) => {
								return ts.factory.createObjectLiteralExpression(
									[
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("title"),
											ts.factory.createStringLiteral(officer.title),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("name"),
											ts.factory.createStringLiteral(officer.name),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("linkedIn"),
											ts.factory.createStringLiteral(officer.linkedIn),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("year"),
											ts.factory.createStringLiteral(officer.year),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("semester"),
											ts.factory.createStringLiteral(officer.semester),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("imageUrl"),
											ts.factory.createStringLiteral(officer.imageUrl),
										),
									],
									true,
								);
							}),
						]),
					),
				],
				ts.NodeFlags.Const,
			),
		),
	);

	return ts.factory.createSourceFile(
		statements,
		ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
		ts.NodeFlags.None,
	);
}

export default generateOfficers;
